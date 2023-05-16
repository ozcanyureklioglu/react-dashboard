using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract.Static
{
    public interface IAnnouncementRepository
    {
        public Task<IEnumerable<Announcement>> GetAnnouncementList();
        public Task<Announcement> GetAnnouncementById(int id);
    }
}
