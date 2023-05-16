using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Business.BusinessAspects;
using Business.Constants;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Logging;
using Core.CrossCuttingConcerns.Logging.Serilog.Loggers;
using Core.Entities.Concrete;
using Core.Utilities.IoC;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Abstract.Static;
using Entities.Dtos;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Business.Handlers.Events
    .Commands
{
    public class CreateEventCommand : IRequest<Core.Utilities.Results.IResult>
    {
        public string Title { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public class CreateEventCommandHandler : IRequestHandler<CreateEventCommand, Core.Utilities.Results.IResult>
        {
            private readonly IEventRepository _eventRepository;
            private readonly IHttpContextAccessor _httpContextAccessor;
            public CreateEventCommandHandler(IEventRepository eventRepository)
            {
                _httpContextAccessor = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>();
                _eventRepository = eventRepository;
            }
             
            public async Task<Core.Utilities.Results.IResult> Handle(CreateEventCommand request, CancellationToken cancellationToken)
            {
                var userId = Convert.ToInt32(_httpContextAccessor.HttpContext?.User.Claims
                .FirstOrDefault(x => x.Type.EndsWith("nameidentifier"))?.Value);

                var start=Convert.ToDateTime(request.Start); 
                var end= Convert.ToDateTime(request.End);

                Random rnd = new Random();

                Event evnt = new Event
                {
                    Id = rnd.Next(10000),
                    UserId = userId,
                    Start = start,
                    Title = request.Title,
                    End = end,
                    Everyone = false,

                };
                _eventRepository.AddEvent(evnt);

                
                return new SuccessResult("Başarılı");
            }
        }
    }
}