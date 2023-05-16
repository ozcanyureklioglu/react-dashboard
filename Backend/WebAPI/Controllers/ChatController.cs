using Business.Handlers.EntityExamples.Queries;
using Business.Handlers.Users.Commands;
using Business.Handlers.Users.Queries;
using Core.Entities.Dtos;
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
    public class ChatController : BaseApiController
    {
        /// <summary>
        /// </summary>
        /// <remarks></remarks>
        /// <return></return>
        /// <response code="200"></response>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ChatMessage>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("GetChatList")]
        public async Task<IActionResult> GetChatList(GetChatListQuery query)
        {
            return GetResponseOnlyResultData(await Mediator.Send(query));
        }
        /// <summary>
        /// </summary>
        /// <remarks></remarks>
        /// <return></return>
        /// <response code="200"></response>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ChatGroupMessage>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("GetGroupChatList")]
        public async Task<IActionResult> GetGroupChatList(GetGroupChatListQuery query)
        {
            return GetResponseOnlyResultData(await Mediator.Send(query));
        }

    }
}
