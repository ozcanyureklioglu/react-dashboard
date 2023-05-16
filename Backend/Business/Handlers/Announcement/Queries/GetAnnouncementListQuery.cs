
using Business.BusinessAspects;
using Core.Utilities.Results;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic; 
using Microsoft.AspNetCore.Http;
using Core.Utilities.IoC;
using System.Linq;
using System;
using Microsoft.Extensions.DependencyInjection;
using Entities.Dtos;
using DataAccess.Abstract.Static;

namespace Business.Handlers.Announcement.Queries
{

    public class GetAnnouncementListQuery : IRequest<IDataResult<IEnumerable<Entities.Dtos.Announcement>>>
    {
        public class GetAnnouncementListQueryHandler : IRequestHandler<GetAnnouncementListQuery, IDataResult<IEnumerable<Entities.Dtos.Announcement>>>
        {
            private readonly IAnnouncementRepository _announcementRepository;

            public GetAnnouncementListQueryHandler( IAnnouncementRepository announcementRepository )
            { 
                _announcementRepository = announcementRepository;
            }
             
            public async Task<IDataResult<IEnumerable<Entities.Dtos.Announcement>>> Handle(GetAnnouncementListQuery request, CancellationToken cancellationToken)
            {
                var list=await _announcementRepository.GetAnnouncementList();
                return new SuccessDataResult<IEnumerable<Entities.Dtos.Announcement>>(list);
            }
        }
    }
}