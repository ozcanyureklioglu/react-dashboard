using DataAccess.Abstract.Static;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.Static
{
    public class EventRepository : IEventRepository
    {
        public static IList<Event> _events=new List<Event>();

        public EventRepository()
        {
            _events.Add(new Event { Id=1,UserId=1,Everyone=false,Title="Toplantı Admin 1",Start=DateTime.Now,End=DateTime.Now.AddDays(1)});
            _events.Add(new Event { Id=2,Everyone=true,Title="Herkesin ortak toplantısı",Start=DateTime.Now,End=DateTime.Now.AddDays(2)});
            _events.Add(new Event { Id=3,UserId=2,Everyone=false,Title="Toplantı Özcan 1",Start=DateTime.Now,End=DateTime.Now.AddDays(3)});
        }

        public void AddEvent(Event eventDto)
        {
            _events.Add(eventDto);
        }

        public void DeleteEvent(Event evnt)
        {
            _events.Remove(evnt);
        }

        public IEnumerable<Event> GetEventsByUserId(int userId)
        {
            var list = _events.Where(x => x.UserId == userId || x.Everyone == true);
            return list;
        }
    }
}
