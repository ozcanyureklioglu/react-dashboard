using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class ChatMessage:IDto
    {
        public int SendId { get; set; }
        public int ReceiveId { get; set; }
        public string Message { get; set; }
        public string Time { get; set; }
    }
}
