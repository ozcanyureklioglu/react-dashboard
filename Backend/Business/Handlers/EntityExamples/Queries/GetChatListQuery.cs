
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

namespace Business.Handlers.EntityExamples.Queries
{

    public class GetChatListQuery : IRequest<IDataResult<IEnumerable<ChatMessage>>>
    {
        public int ReceiveId { get; set; }
        public class GetChatListQueryHandler : IRequestHandler<GetChatListQuery, IDataResult<IEnumerable<ChatMessage>>>
        {
            private readonly IHttpContextAccessor _httpContextAccessor;
            private readonly IMediator _mediator;
            private readonly IChatRepository _chatRepository;
            public GetChatListQueryHandler(IChatRepository chatRepository, IMediator mediator)
            {
                _httpContextAccessor = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>();
                _mediator = mediator;
                _chatRepository= chatRepository;
            }

            //[PerformanceAspect(5)]
            //[CacheAspect(10)]
            //[LogAspect(typeof(FileLogger))]
            //[SecuredOperation(Priority = 1)]
            public async Task<IDataResult<IEnumerable<ChatMessage>>> Handle(GetChatListQuery request, CancellationToken cancellationToken)
            {
                var userId = Convert.ToInt32(_httpContextAccessor.HttpContext?.User.Claims
                .FirstOrDefault(x => x.Type.EndsWith("nameidentifier"))?.Value);
                var list = _chatRepository.GetChatMessageList(x => (x.SendId == userId && x.ReceiveId == request.ReceiveId) || (x.SendId == request.ReceiveId && x.ReceiveId == userId));

                return new SuccessDataResult<IEnumerable<ChatMessage>>(list);
            }
        }
    }
}