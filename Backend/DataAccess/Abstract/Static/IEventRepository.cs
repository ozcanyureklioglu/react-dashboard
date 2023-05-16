using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract.Static
{
    public interface IEventRepository
    {
        IEnumerable<Event> GetEventsByUserId(int userId);
        void AddEvent(Event eventDto);
        void DeleteEvent(Event evnt);
    }
}
