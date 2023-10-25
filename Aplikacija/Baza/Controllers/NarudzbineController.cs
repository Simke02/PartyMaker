namespace Aplikacija.Controllers;

[ApiController]
[Route("api/[controller]")]

public class NarudzbineController : Controller
{
    private readonly PartyMakerContext _context;

    public NarudzbineController(PartyMakerContext context)
    {
        _context = context;
    }

    [HttpPost]
    [Route("DodajNarudzbinu")]

    public async Task<IActionResult> DodajNarudzbinu([FromBody] Narudzbina narudzbina)
    {
        await _context.Narudzbine.AddAsync(narudzbina);
        await _context.SaveChangesAsync();

        return Ok(narudzbina);
    }

    [HttpGet]
    [Route("PrikaziNarudzbine")]

    public async Task<IActionResult> PrikaziNarudzbine()
    {
        var listaNarudzbina = await _context.Narudzbine
                                            .Include(a => a.SviProizvodiNarudzbine)
                                            .OrderByDescending(e => e.ID)
                                            .ToListAsync();

        if(listaNarudzbina != null)
        {
            return Ok(listaNarudzbina);
        }

        return BadRequest("Lista narduzbina je prazna!");
    }

    [HttpGet]
    [Route("PrikaziPotrosaceveNarudzbine/{idPotrosaca}")]

    public async Task<IActionResult> PrikaziPotrosaceveNarudzbine(int idPotrosaca)
    {
        var listaNarudzbina = await _context.Narudzbine.Where(p => p.PotI == idPotrosaca)
                                                    .Include(a => a.SviProizvodiNarudzbine)
                                                    .OrderByDescending(e => e.ID)
                                                    .ToListAsync();

        if(listaNarudzbina != null)
        {
            return Ok(listaNarudzbina);
        }

        return BadRequest("Lista narduzbina je prazna!");
    }

    [HttpPut, Authorize(Roles = "Admin")]
    [Route("IzmeniStatusNarudzbine/{idNarudzbine}")]

    public async Task<IActionResult> IzmeniStatusNarudzbine(int idNarudzbine, [FromBody] Narudzbina updatedNarudzbina)
    {
        var narudzbinaTMP = await _context.Narudzbine.Where(p => p.ID == idNarudzbine).FirstAsync();


        if (narudzbinaTMP != null)
        {
            narudzbinaTMP.StatusPorudzine = updatedNarudzbina.StatusPorudzine;
            
            _context.Narudzbine.Update(narudzbinaTMP);
            await _context.SaveChangesAsync();


            return Ok(narudzbinaTMP);
        }

        return BadRequest("Neuspesno promenjena narudzbina, ne postoji narudzbina sa tim ID-jem u bazi podataka!");
    }

    [HttpGet, Authorize(Roles = "User, Admin")]
    [Route("GetNarudzbinu/{idNarudzbina}")]

    public async Task<IActionResult> GetNarudzbinu(int idNarudzbina)
    {
        var trenutniRole = User.FindFirstValue(ClaimTypes.Role);

        if(trenutniRole == "User")
        {
            var emailUsera = User.FindFirstValue(ClaimTypes.Email);

            var narudzbinaTMP = await _context.Narudzbine
                                            .Where(p => p.ID == idNarudzbina && p.EmailKup == emailUsera)
                                            .Include(a => a.SviProizvodiNarudzbine)            
                                            .FirstAsync();

            if (narudzbinaTMP != null)
            {
                return Ok(narudzbinaTMP);
            }

            return BadRequest("Nes jebat!");
        }
        else
        {
            var narudzbinaTMP = await _context.Narudzbine
                                            .Where(p => p.ID == idNarudzbina)
                                            .Include(a => a.SviProizvodiNarudzbine)            
                                            .FirstAsync();

            if (narudzbinaTMP != null)
            {
                return Ok(narudzbinaTMP);
            }
        }


        

        return BadRequest("Ne postoji narudzbina sa tim id-jem");
    }
}