using Business.Handlers.Announcement.Queries;
using Business.Handlers.EntityExamples.Queries;
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
    public class AnnouncementController : BaseApiController
    {
        /// <summary>
        /// </summary>
        /// <remarks></remarks>
        /// <return></return>
        /// <response code="200"></response>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Announcement>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("GetAnnouncementList")]
        public async Task<IActionResult> GetAnnouncementList()
        {
            return GetResponseOnlyResultData(await Mediator.Send(new GetAnnouncementListQuery()));
        } 
        /// <summary>
        /// </summary>
        /// <remarks></remarks>
        /// <return></return>
        /// <response code="200"></response>
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Announcement))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAnnouncement(int id)
        {
            return GetResponseOnlyResultData(await Mediator.Send(new GetAnnouncementByIdQuery { Id=id}));
        } 

    }
}
