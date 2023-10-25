namespace Aplikacija.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PicaController : Controller
{
    private readonly PartyMakerContext _context;

    public PicaController(PartyMakerContext context)
    {
        _context = context;
    }


    [HttpGet]
    [Route("VratiPicaFilter/{lit}")]
    public async Task<IActionResult> VratiPicaFilter(double lit)
    {
        try
        {
            var pica = await _context.Pica.Where(p => p.Litraza == lit).ToListAsync();
        
            if(pica != null)
            {
                return Ok(pica);
            }

            return BadRequest("Nije pronadjeno ni jedno pice sa litrazom!");
        }
        catch (Exception ec)
        {
            return BadRequest(ec.Message);
        }
    }
}
