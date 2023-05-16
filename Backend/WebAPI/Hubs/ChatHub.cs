using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Http;
using Core.Utilities.IoC;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using Core.Entities.Concrete;
using Entities.Dtos;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;
using System.IO;
using System.IdentityModel.Tokens.Jwt;
using Core.CrossCuttingConcerns.Caching;
using DataAccess.Abstract.Static;

namespace WebAPI.Hubs
{
    
    public class ChatHub:Hub
    {
        private  IList<ChatGroupUser> _chatGroupUser;


        private readonly IChatRepository _chatRepository;

        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ICacheManager _cacheManager;

        public ChatHub(IChatRepository chatRepository)
        {
            _chatRepository= chatRepository;
            _httpContextAccessor = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>();
            _cacheManager = ServiceTool.ServiceProvider.GetService<ICacheManager>();
            _chatGroupUser= new List<ChatGroupUser>();
            _chatGroupUser.Add(new ChatGroupUser { GroupId = "1", UserId = "1" });
            _chatGroupUser.Add(new ChatGroupUser { GroupId = "1", UserId = "2" });
            _chatGroupUser.Add(new ChatGroupUser { GroupId = "1", UserId = "4" });
            _chatGroupUser.Add(new ChatGroupUser { GroupId = "2", UserId = "1" });
            _chatGroupUser.Add(new ChatGroupUser { GroupId = "2", UserId = "2" });
        }

        public async Task SendMessageToUser(PostMessageDto messageDto)
        {
            CheckAuth();
            var connectionId = _cacheManager.Get(messageDto.ReceiveId.ToString());
            var userId = Convert.ToInt32(GetUserId());
            var chatMessage = new ChatMessage
            {
                SendId = userId,
                ReceiveId = messageDto.ReceiveId,
                Message = messageDto.Message,
                Time = DateTime.Now.ToString("dd.MM.yyyy - HH:mm"),
            };
            _chatRepository.AddChatMessage(chatMessage);
            if (connectionId != null)
            { 
                // Belirtilen bağlantıya mesaj gönder

                await Clients.Client(connectionId.ToString()).SendAsync("ReceiveMessage", chatMessage);
            }
        }

        public async Task SendMessageToAll(ChatMessage message)
        {
            _chatRepository.AddChatMessage(message);
            await Clients.All.SendAsync("ReceiveAllMessage", message);
            
        }

        public async Task SendMessageToGroup(PostMessageDto messageDto)
        {
            CheckAuth();
            var userId = GetUserId();
            var userName = GetUserName();
            var checkUserGroup=_chatGroupUser.Where(x => x.UserId == userId).Any(y=>y.GroupId== messageDto.ReceiveId.ToString());
            if (checkUserGroup)
            {
                var chatGroupMessage = new ChatGroupMessage { 
                SendId= Convert.ToInt32(userId),
                SendUserName= userName,
                ReceiveId= messageDto.ReceiveId,
                Message= messageDto.Message,
                Time=DateTime.Now.ToString("dd.MM.yyyy - HH:mm")
                };
                _chatRepository.AddChatGroupMessage(chatGroupMessage);
                await Clients.Group(messageDto.ReceiveId.ToString()).SendAsync("ReceiveGroupMessage", chatGroupMessage);
            }
            
        }
         
        public override Task OnConnectedAsync()
        {
            CheckAuth();
            var userId = GetUserId();
            // Kullanıcının bağlantı kimliğini ve UserId'sini eşleştir
            if (userId != null)
            {
                _cacheManager.Add(userId, Context.ConnectionId,1);
                //_userConnections[Context.ConnectionId] = userId;
                var userGroupList = _chatGroupUser.Where(x => x.UserId == userId).Distinct();
                foreach (var group in userGroupList)
                {
                    JoinGroup(group.GroupId);
                }
            }
            
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var context = Context.GetHttpContext();
            var token = context.Request.Query["access_token"];


            var handler = new JwtSecurityTokenHandler();
            var decodeToken = handler.ReadJwtToken(token.ToString());
            var userId = decodeToken.Claims.FirstOrDefault(x => x.Type.EndsWith("nameidentifier"))?.Value;
            // Kullanıcının bağlantı kimliğini ve UserId'sini eşleştir
            if (userId != null)
            {
                _cacheManager.Remove(userId);
                //_userConnections[Context.ConnectionId] = userId;
                var userGroupList = _chatGroupUser.Where(x => x.UserId == userId);
                foreach (var group in userGroupList)
                {
                    LeaveGroup(group.GroupId);
                }
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task JoinGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

        }

        public async Task LeaveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

        }

        private string GetUserId()
        {
            var context = Context.GetHttpContext();
            var token = context.Request.Query["access_token"];

            var handler = new JwtSecurityTokenHandler();
            var decodeToken = handler.ReadJwtToken(token.ToString());
             
            var userId = decodeToken.Claims.FirstOrDefault(x => x.Type.EndsWith("nameidentifier"))?.Value;

            return userId;
        }

        private async void CheckAuth()
        {
            var context = Context.GetHttpContext();
            var token = context.Request.Query["access_token"];

            var handler = new JwtSecurityTokenHandler();
            var decodeToken = handler.ReadJwtToken(token.ToString());
            if (decodeToken.ValidTo < DateTime.UtcNow)
            {
                await Clients.Caller.SendAsync("hubError", 401, "Token süresi doldu"); 
            }
        }
        private string GetUserName()
        {
            var context = Context.GetHttpContext();
            var token = context.Request.Query["access_token"];

            var handler = new JwtSecurityTokenHandler();
            var decodeToken = handler.ReadJwtToken(token.ToString());
            var userName = decodeToken.Claims.FirstOrDefault(x => x.Type.EndsWith("name"))?.Value;
            return userName;
        }

    }
}
