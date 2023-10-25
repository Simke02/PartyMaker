namespace Aplikacija.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ONamaController : Controller
{
    private readonly PartyMakerContext _context;

    public ONamaController(PartyMakerContext context)
    {
        _context = context;
    }

    [HttpPost, Authorize(Roles = "Admin")]
    [Route("DodajONama")]

    public async Task<IActionResult> DodajONama([FromBody] ONama about)
    {
        await _context.ONama.AddAsync(about);
        await _context.SaveChangesAsync();
    
        return Ok(about);
    }

    [HttpPut, Authorize(Roles = "Admin")]
    [Route("IzmeniONama")]

    public async Task<IActionResult> IzmeniONama([FromBody] ONama updatedAbout)
    {
        var aboutTMP = await _context.ONama.Where(p => p.ID == 1).FirstAsync();

        aboutTMP.parag1 = updatedAbout.parag1;
        aboutTMP.parag2 = updatedAbout.parag2;
        aboutTMP.parag3 = updatedAbout.parag3;
        aboutTMP.image1 = updatedAbout.image1;
        aboutTMP.image2 = updatedAbout.image2;
        aboutTMP.image3 = updatedAbout.image3;


        _context.ONama.Update(aboutTMP);
        await _context.SaveChangesAsync();

        return Ok(aboutTMP);
    }

    [HttpGet]
    [Route("VratiONama")]

    public async Task<IActionResult> VratiONama()
    {
        var tmpONama = await _context.ONama.Where(p => p.ID == 1).FirstAsync();
        
        if (tmpONama != null)
        {
            return Ok(tmpONama);
        }

        return BadRequest("Ne postoji ONama sa ovom sifrom u bazi");
    }

}
