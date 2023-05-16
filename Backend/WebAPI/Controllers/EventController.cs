using Business.Handlers.Announcement.Queries;
using Business.Handlers.EntityExamples.Queries;
using Business.Handlers.EventDtoes.Queries;
using Business.Handlers.Events.Commands;
using Business.Handlers.Users.Commands;
using Entities.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    /// <summary>
    /// If controller methods will not be Authorize, [AllowAnonymous] is used.
    /// </summary>
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class EventController : BaseApiController
    {
        /// <summary>
        /// </summary>
        /// <remarks></remarks>
        /// <return></return>
        /// <response code="200"></response>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<EventDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetUserEvents")]
        public async Task<IActionResult> GetUserEvents()
        {
            return GetResponseOnlyResultData(await Mediator.Send(new GetEventsByUserIdQuery()));
        }


        /// <summary>
        /// Add User.
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost]
        public async Task<IActionResult> AddEvent(CreateEventCommand query)
        {
            return GetResponseOnlyResultMessage(await Mediator.Send(query));
        }

        /// <summary>
        /// Delete User.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            return GetResponseOnlyResultMessage(await Mediator.Send(new DeleteEventCommand { Id=id}));
        }

    }
}
