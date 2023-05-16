using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract.Static
{
    public interface IChatRepository
    {
        bool AddChatMessage(ChatMessage message);
        bool AddChatGroupMessage(ChatGroupMessage groupMessage);
        IEnumerable<ChatMessage> GetChatMessageList(Expression<Func<ChatMessage, bool>> expression);
        IEnumerable<ChatGroupMessage> GetChatGroupMessageList(Expression<Func<ChatGroupMessage, bool>> expression);
    }
}
