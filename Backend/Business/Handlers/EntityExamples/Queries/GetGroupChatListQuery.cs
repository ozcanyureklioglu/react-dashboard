
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
using Microsoft.AspNetCore.Http;
using DataAccess.Abstract.Static;
using Core.Utilities.IoC;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System;

namespace Business.Handlers.EntityExamples.Queries
{

    public class GetGroupChatListQuery : IRequest<IDataResult<IEnumerable<ChatGroupMessage>>>
    {
        public int ReceiveId { get; set; }
        public class GetGroupChatListQueryHandler : IRequestHandler<GetGroupChatListQuery, IDataResult<IEnumerable<ChatGroupMessage>>>
        {
            private readonly IHttpContextAccessor _httpContextAccessor;
            private readonly IChatRepository _chatRepository;
            private readonly IMediator _mediator;

            public GetGroupChatListQueryHandler(IChatRepository chatRepository, IMediator mediator)
            {
                _httpContextAccessor = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>();
                _mediator = mediator;
                _chatRepository = chatRepository;
            }

            //[PerformanceAspect(5)]
            //[CacheAspect(10)]
            //[LogAspect(typeof(FileLogger))]
            //[SecuredOperation(Priority = 1)]
            public async Task<IDataResult<IEnumerable<ChatGroupMessage>>> Handle(GetGroupChatListQuery request, CancellationToken cancellationToken)
            {
                var userId = Convert.ToInt32(_httpContextAccessor.HttpContext?.User.Claims
                                            .FirstOrDefault(x => x.Type.EndsWith("nameidentifier"))?.Value);

                var list = _chatRepository.GetChatGroupMessageList(x => x.ReceiveId==request.ReceiveId );
                return new SuccessDataResult<IEnumerable<ChatGroupMessage>>(list);
            }
        }
    }
}