namespace Aplikacija.Controllers;

[ApiController]
[Route("api/[controller]")]

public class BezalkoholnoPiceController : Controller
{

    private readonly PartyMakerContext _context;
    public BezalkoholnoPiceController(PartyMakerContext context)
    {
        _context = context;
    }

    [HttpPost, Authorize(Roles = "Admin")]
    [Route("DodajBezAlkPice")]

    public async Task<IActionResult> DodajBezAlkPice([FromBody] BezalkoholnoPice bezAlkPice)
    {
        await _context.BezalkoholnaPica.AddAsync(bezAlkPice);
        await _context.SaveChangesAsync();

        return Ok(bezAlkPice);
    }

    [HttpGet]
    [Route("PrikaziSvaBezAlkPica")]

    public async Task<IActionResult> PrikaziSvaBezAlkPica()
    {
        var bezAlkPica = await _context.BezalkoholnaPica.ToListAsync();

        return Ok(bezAlkPica);

    }

    [HttpGet]
    [Route("PrikaziFiltriranaBezAlkPica/{gazirano}/{ukus}")]

    public async Task<IActionResult> PrikaziFiltriranaBezAlkPica(bool gazirano, string ukus)
    {
        Ukus parsovaniUkus = (Ukus) Enum.Parse(typeof(Ukus), ukus);

        try
        {

            var sokoviGaz = await _context.BezalkoholnaPica.Where(p => p.Gazirano == gazirano && p.Ukus == parsovaniUkus).ToListAsync();

            // var sokoviUkus = await _context.BezalkoholnaPica.Where(p => p.Ukus == parsovaniUkus).ToListAsync();

            if (sokoviGaz != null && sokoviGaz.Any()) // moralo da se ubaci sokoviGaz.Any() da proveri da li je lista prazna 
            //jer moze da se dobije prazna lista i da prodje kroz if i vrati Ok umesto BadReq 
            {
                return Ok(sokoviGaz);
            }

            return BadRequest("Nema proizvoda sa zadatim filterima (bezAlkPica)");
        }
        catch (Exception ec)
        {
            return BadRequest(ec.Message);
        }
    } 

    [HttpPut, Authorize(Roles = "Admin")]
    [Route("UpdateBezalkoholnoPice/{idBezalkPica}")]

    public async Task<IActionResult> UpdateBezalkoholnoPice(int idBezalkPica, [FromBody] BezalkoholnoPice updatedPice)
    {
        var bezalkPiceTMP = await _context.BezalkoholnaPica.Where(p => p.ID == idBezalkPica).FirstAsync();


        if (bezalkPiceTMP != null)
        {
            bezalkPiceTMP.Naziv = updatedPice.Naziv;
            bezalkPiceTMP.Proizvodjac = updatedPice.Proizvodjac;
            bezalkPiceTMP.Cena = updatedPice.Cena;
            bezalkPiceTMP.KratakOpis = updatedPice.KratakOpis;
            bezalkPiceTMP.DostupnaKolicina = updatedPice.DostupnaKolicina;
            bezalkPiceTMP.Slika = updatedPice.Slika;
            bezalkPiceTMP.VremeDodavanja = updatedPice.VremeDodavanja;
            bezalkPiceTMP.Proizvodjac = updatedPice.Proizvodjac;
            bezalkPiceTMP.Gazirano = updatedPice.Gazirano;
            bezalkPiceTMP.Ukus = updatedPice.Ukus;
            bezalkPiceTMP.Litraza = updatedPice.Litraza;
            
            _context.BezalkoholnaPica.Update(bezalkPiceTMP);
            await _context.SaveChangesAsync();


            return Ok(bezalkPiceTMP);
        }

        return BadRequest("Neuspesno promenjen proizvod, ne postoji proizvod sa tim ID-jem u bazi podataka!");
    }

    [HttpGet]
    [Route("GetBezalkoholno/{idBezalk}")]

    public async Task<IActionResult> GetAlkohol(int idBezalk)
    {
        var bezalkTMP = await _context.BezalkoholnaPica.Where(p => p.ID == idBezalk).FirstAsync();

        if (bezalkTMP != null)
        {
            return Ok(bezalkTMP);
        }

        return BadRequest($"Ne postoji bezalkoholno pice sa id-jem: {bezalkTMP.ID}");
    }


    [HttpDelete, Authorize(Roles = "Admin")]
    [Route("DeleteBezalkoholno/{idBezalk}")]

    public async Task<IActionResult> DeleteAlkohol(int idBezalk)
    {
        
        try
        {
            var bezalkTMP = await _context.BezalkoholnaPica.Where(p => p.ID == idBezalk).FirstAsync();

            _context.BezalkoholnaPica.Remove(bezalkTMP);

            await _context.SaveChangesAsync();

            return Ok($"Uspesno izbrisano bezalkoholno pice sa indeksom {bezalkTMP.ID}");
        }
        catch (Exception ec)
        {
            return BadRequest(ec.Message);
        }
    }

    [HttpGet]
    [Route("PrikaziHomeBezAlkPica")]

    public async Task<IActionResult> PrikaziHomeBezAlkPica()
    {
        var bezAlkPica = await _context.BezalkoholnaPica
                                        .OrderByDescending(e => e.VremeDodavanja)
                                        .Take(4)
                                        .ToListAsync();

        return Ok(bezAlkPica);

    }


}