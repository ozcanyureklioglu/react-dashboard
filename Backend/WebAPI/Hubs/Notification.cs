using Microsoft.AspNetCore.SignalR;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace WebAPI.Hubs
{
    public class Notification : Hub
    {
        public Notification()
        {

        }
        public async Task SendNotification(string bildirim)
        {
            CheckAuth();
            await Clients.All.SendAsync("Notification", bildirim);
        }

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
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
    }
}
