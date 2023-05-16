using DataAccess.Abstract.Static;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.Static
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        public static List<Announcement> _announcement=new List<Announcement>();

        public AnnouncementRepository()
        {
            _announcement.Add(new Announcement {Id=1,Header="Duyuru 1" ,Content="Yeni bir duyuru 1 açıklaması burasıdır.",ExpDate=DateTime.Now.AddMonths(2)}); 
            _announcement.Add(new Announcement {Id=2,Header="Duyuru 2" ,Content="Yeni bir duyuru 2 açıklaması burasıdır.",ExpDate=DateTime.Now.AddMonths(3)}); 
            _announcement.Add(new Announcement {Id=3,Header="Duyuru 3" ,Content="Yeni bir duyuru 3 açıklaması burasıdır.",ExpDate=DateTime.Now.AddMonths(4)}); 
            _announcement.Add(new Announcement {Id=4,Header="Duyuru 4" ,Content="Yeni bir duyuru 4 açıklaması burasıdır.",ExpDate=DateTime.Now.AddMonths(5)}); 
            _announcement.Add(new Announcement {Id=5,Header="Duyuru 5" ,Content= "Yeni bir duyuru 5 açıklaması burasıdır.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.", ExpDate=DateTime.Now.AddMonths(6)}); 
        }

        public async Task<Announcement> GetAnnouncementById(int id)
        {
            return _announcement.Where(x => x.Id == id).FirstOrDefault();
        }

        public async Task<IEnumerable<Announcement>> GetAnnouncementList()
        {
            return _announcement;
        }
    }
}
