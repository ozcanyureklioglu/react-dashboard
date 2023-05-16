using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class ChatMessageView
    {
        public int SendId { get; set; } 
        public int ReceiveId { get; set; }
        public string Message { get; set; }
        public DateTime Time { get; set; }
    }
}
