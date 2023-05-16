using Core.Entities;
using DataAccess.Abstract.Static;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.Static
{
    public class ChatRepository: IChatRepository
    {
        public static List<ChatMessage> _chatMessageList = new List<ChatMessage>();
        public static List<ChatGroupMessage> _chatGroupMessageList= new List<ChatGroupMessage>();
        public ChatRepository()
        {
        }

        public bool AddChatMessage(ChatMessage message)
        {
            _chatMessageList.Add(message);
            return true;
        }
        public bool AddChatGroupMessage(ChatGroupMessage groupMessage)
        {
            _chatGroupMessageList.Add(groupMessage);
            return true;
        }

        public IEnumerable<ChatMessage> GetChatMessageList(Expression<Func<ChatMessage, bool>> expression)
        {
            return _chatMessageList.AsQueryable().Where(expression);
        }
        public IEnumerable<ChatGroupMessage> GetChatGroupMessageList(Expression<Func<ChatGroupMessage, bool>> expression)
        {
            return _chatGroupMessageList.AsQueryable().Where(expression);
        }


    }
}
