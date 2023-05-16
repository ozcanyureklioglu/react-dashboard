
using Business.BusinessAspects;
using Core.Utilities.Results;
using Core.Aspects.Autofac.Performance;
using DataAccess.Abstract;
using Entities.Concrete;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Aspects.Autofac.Logging;
using Core.Aspects.Autofac.Caching;
using Entities.Dtos;
using DataAccess.Abstract.Static;
using Microsoft.AspNetCore.Http;
using Core.Utilities.IoC;
using System.Linq;
using System;
using Microsoft.Extensions.DependencyInjection;

namespace Business.Handlers.EventDtoes.Queries
{

    public class GetEventsByUserIdQuery : IRequest<IDataResult<IEnumerable<EventDto>>>
    { 
        public class GetEventsByUserIdQueryHandler : IRequestHandler<GetEventsByUserIdQuery, IDataResult<IEnumerable<EventDto>>>
        {
            private readonly IHttpContextAccessor _httpContextAccessor;
            private readonly IEventRepository _eventRepository;
            private readonly IMediator _mediator;

            public GetEventsByUserIdQueryHandler(IEventRepository eventRepository, IMediator mediator)
            {
                _httpContextAccessor = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>();
                _eventRepository = eventRepository;
                _mediator = mediator;
            }

            //[PerformanceAspect(5)]
            //[CacheAspect(10)]
            //[LogAspect(typeof(FileLogger))]
            //[SecuredOperation(Priority = 1)]
            public async Task<IDataResult<IEnumerable<EventDto>>> Handle(GetEventsByUserIdQuery request, CancellationToken cancellationToken)
            {
                var userId = _httpContextAccessor.HttpContext?.User.Claims
                .FirstOrDefault(x => x.Type.EndsWith("nameidentifier"))?.Value;

                var list = _eventRepository.GetEventsByUserId(Convert.ToInt32(userId)).Select(p => new EventDto { Id = p.Id, Title = p.Title, Start = p.Start, End = p.End });
                return new SuccessDataResult<IEnumerable<EventDto>>(list);
            }
        }
    }
}