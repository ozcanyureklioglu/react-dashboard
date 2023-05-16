
using Business.BusinessAspects;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Aspects.Autofac.Logging;
using DataAccess.Abstract.Static;

namespace Business.Handlers.Announcement.Queries
{

    public class GetAnnouncementByIdQuery : IRequest<IDataResult<Entities.Dtos.Announcement>>
    {
        public int Id { get; set; }

        public class GetAnnouncementByIdQueryHandler : IRequestHandler<GetAnnouncementByIdQuery, IDataResult<Entities.Dtos.Announcement>>
        {
            private readonly IAnnouncementRepository _announcementRepository;
            private readonly IMediator _mediator;

            public GetAnnouncementByIdQueryHandler(IAnnouncementRepository announcementRepository, IMediator mediator)
            {
                _announcementRepository = announcementRepository;
                _mediator = mediator;
            } 

            public async Task<IDataResult<Entities.Dtos.Announcement>> Handle(GetAnnouncementByIdQuery request, CancellationToken cancellationToken)
            {
                var announcement = await _announcementRepository.GetAnnouncementById(request.Id);
                return new SuccessDataResult<Entities.Dtos.Announcement>(announcement);
            }
        }
    }
}
