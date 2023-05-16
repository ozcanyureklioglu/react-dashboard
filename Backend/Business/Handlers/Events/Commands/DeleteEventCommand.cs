
using Business.Constants;
using Core.Aspects.Autofac.Caching;
using Business.BusinessAspects;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Utilities.Results;
using DataAccess.Abstract;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using DataAccess.Abstract.Static;
using System;
using Core.Utilities.IoC;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace Business.Handlers.Events.Commands
{


    public class DeleteEventCommand : IRequest<Core.Utilities.Results.IResult>
    {
        public int Id { get; set; }

        public class DeleteEventCommandHandler : IRequestHandler<DeleteEventCommand, Core.Utilities.Results.IResult>
        {
            private readonly IEventRepository _eventRepository;
            private readonly IMediator _mediator;
            private readonly IHttpContextAccessor _httpContextAccessor;
            public DeleteEventCommandHandler(IEventRepository eventRepository, IMediator mediator)
            {
                _httpContextAccessor = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>();
                _eventRepository = eventRepository;
                _mediator = mediator;
            }

            public async Task<Core.Utilities.Results.IResult> Handle(DeleteEventCommand request, CancellationToken cancellationToken)
            {

                var userId = Convert.ToInt32(_httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(x => x.Type.EndsWith("nameidentifier"))?.Value);
                var listUserEvent = _eventRepository.GetEventsByUserId(userId);
                var evnt = listUserEvent.Where(x => x.Id == request.Id).FirstOrDefault();
                if (evnt.Everyone == true)
                {
                    return new ErrorResult("Herkese açık olan bir etkinliği silemezsiniz!");
                }
                if (evnt==null)
                {
                    
                }
                _eventRepository.DeleteEvent(evnt);
                return new SuccessResult("Silme İŞlemi Başarılı");
            }
        }
    }
}

