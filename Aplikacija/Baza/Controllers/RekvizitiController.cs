namespace Aplikacija.Controllers;

[ApiController]
[Route("/api/[controller]")]

public class RekvizitiController : Controller
{
    private readonly PartyMakerContext _context;

    public RekvizitiController(PartyMakerContext context)
    {
        _context = context;      
    }

    [HttpPost, Authorize(Roles = "Admin")]
    [Route("DodajNoviRekvizit")]

    public async Task<IActionResult> DodajNoviRekvizit([FromBody] Rekviziti noviRekvizit)
    {
        await _context.Rekviziti.AddAsync(noviRekvizit);
        await _context.SaveChangesAsync();

        return Ok(noviRekvizit);
    }

    [HttpGet]
    [Route("PrikaziFiltriraneRekvizite/{tip}")]
    
    public async Task<IActionResult> PrikaziFiltriraneRekvizite(string tip)
    {
        var parsovaniTip = (TipRekvizita) Enum.Parse(typeof(TipRekvizita), tip);

        try
        {
            var listaRekvizita = await _context.Rekviziti.Where(p => p.Tip == parsovaniTip).ToListAsync();
        
            if(listaRekvizita != null && listaRekvizita.Any())
            {
                return Ok(listaRekvizita);
            }
            return BadRequest("Nije pronadjen ni jedan rekvizit sa zadatim filterima!");
        }
        catch (Exception ec)
        {
            return BadRequest(ec.Message);
        }
    }

    [HttpGet]
    [Route("PrikaziSveRekvizite")]

    public async Task<IActionResult> PrikaziSveRekvizite()
    {
        var listaSvihRekvizita = await _context.Rekviziti.ToListAsync();

        if(listaSvihRekvizita != null)
        {
            return Ok(listaSvihRekvizita);
        }

        return BadRequest("U bazi ne postoji ni jedan rekvizit");
    } 

    [HttpPut, Authorize(Roles = "Admin")]
    [Route("UpdateRekvizit/{idRekvizita}")]

    public async Task<IActionResult> UpdateBezalkoholnoPice(int idRekvizita, [FromBody] Rekviziti updatedRekvizit)
    {
        var rekvizitTMP = await _context.Rekviziti.Where(p => p.ID == idRekvizita).FirstAsync();


        if (rekvizitTMP != null)
        {
            rekvizitTMP.Naziv = updatedRekvizit.Naziv;
            rekvizitTMP.Proizvodjac = updatedRekvizit.Proizvodjac;
            rekvizitTMP.Cena = updatedRekvizit.Cena;
            rekvizitTMP.KratakOpis = updatedRekvizit.KratakOpis;
            rekvizitTMP.DostupnaKolicina = updatedRekvizit.DostupnaKolicina;
            rekvizitTMP.Slika = updatedRekvizit.Slika;
            rekvizitTMP.VremeDodavanja = updatedRekvizit.VremeDodavanja;
            rekvizitTMP.Proizvodjac = updatedRekvizit.Proizvodjac;
            rekvizitTMP.Tip = updatedRekvizit.Tip;
            
            
            _context.Rekviziti.Update(rekvizitTMP);
            await _context.SaveChangesAsync();


            return Ok(rekvizitTMP);
        }

        return BadRequest("Neuspesno promenjen proizvod, ne postoji proizvod sa tim ID-jem u bazi podataka!");
    }

    [HttpGet]
    [Route("GetRekvizit/{idRekvizita}")]

    public async Task<IActionResult> GetAlkohol(int idRekvizita)
    {
        var rekvizitTMP = await _context.Rekviziti.Where(p => p.ID == idRekvizita).FirstAsync();

        if (rekvizitTMP != null)
        {
            return Ok(rekvizitTMP);
        }

        return BadRequest("Ne postoji rekvizit sa tim id-jem");
    }

    [HttpDelete, Authorize(Roles = "Admin")]
    [Route("DeleteRekvizit/{idRekvizita}")]

    public async Task<IActionResult> DeleteRekvizit(int idRekvizita)
    {
        
        try
        {
            var rekvizitTMP = await _context.Rekviziti.Where(p => p.ID == idRekvizita).FirstAsync();

            _context.Rekviziti.Remove(rekvizitTMP);

            await _context.SaveChangesAsync();

            return Ok($"Uspesno izbrisan rekvizit sa indeksom {rekvizitTMP.ID}");
        }
        catch (Exception ec)
        {
            return BadRequest(ec.Message);
        }
    }

    [HttpGet]
    [Route("PrikaziHomeRekvizite")]

    public async Task<IActionResult> PrikaziHomeRekvizite()
    {
        var listaSvihRekvizita = await _context.Rekviziti
                                                .OrderByDescending(e => e.VremeDodavanja)
                                                .Take(4)
                                                .ToListAsync();

        if(listaSvihRekvizita != null)
        {
            return Ok(listaSvihRekvizita);
        }

        return BadRequest("U bazi ne postoji ni jedan rekvizit");
    } 
}