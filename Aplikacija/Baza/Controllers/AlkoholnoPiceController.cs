namespace Aplikacija.Controllers;

[ApiController]
[Route("api/[controller]")]

public class AlkoholnoPiceController : Controller
{
    private readonly PartyMakerContext _context;

    public AlkoholnoPiceController(PartyMakerContext context)
    {
        _context = context;
    }

    [HttpPost]
    [Route("DodajAlkoholnoPice")]

    public async Task<IActionResult> DodajAlkoholnoPice([FromBody] AlkoholnoPice alkoholnoPice)
    {
        await _context.AddAsync(alkoholnoPice);
        await _context.SaveChangesAsync();

        return Ok(alkoholnoPice);
    }

    [HttpGet]
    [Route("PrikaziSvaAlkoholnaPica")]

    public async Task<IActionResult> PrikaziSvaAlkoholnaPica()
    {

        var alkPica = await _context.AlkoholnaPica.ToListAsync();

        return Ok(alkPica);
    }

    [HttpGet]
    [Route("PrikaziFiltriranaAlkoholnaPica/{vrsta}/{procenat}")]

    public async Task<IActionResult> PrikaziFiltriranaAlkoholnaPica(string vrsta, double procenat)
    {
        var parsovanaVrsta = (VrstaAlkohola) Enum.Parse(typeof(VrstaAlkohola), vrsta);

        try
        {
            var listaAlkPica = await _context.AlkoholnaPica.Where(p => p.Vrsta == parsovanaVrsta && p.ProcenatAlkohola == procenat).ToListAsync();

            if(listaAlkPica !=null && listaAlkPica.Any())
            {
                return Ok(listaAlkPica);
            }

            return BadRequest("Nije pronadjeno alkoholno pice sa zadatim filterima!");
        }
        catch (Exception ec)
        {
            return BadRequest(ec.Message);
        }
    }

    [HttpPut, Authorize(Roles = "Admin")]
    [Route("UpdateAlkoholnoPice/{idAlkPica}")]

    public async Task<IActionResult> UpdateAlkoholnoPice(int idAlkPica, [FromBody] AlkoholnoPice updatedPice)
    {
        var alkPiceTMP = await _context.AlkoholnaPica.Where(p => p.ID == idAlkPica).FirstAsync();


        if (alkPiceTMP != null)
        {
            alkPiceTMP.Naziv = updatedPice.Naziv;
            alkPiceTMP.Proizvodjac = updatedPice.Proizvodjac;
            alkPiceTMP.Cena = updatedPice.Cena;
            alkPiceTMP.KratakOpis = updatedPice.KratakOpis;
            alkPiceTMP.DostupnaKolicina = updatedPice.DostupnaKolicina;
            alkPiceTMP.Slika = updatedPice.Slika;
            alkPiceTMP.VremeDodavanja = updatedPice.VremeDodavanja;
            alkPiceTMP.Proizvodjac = updatedPice.Proizvodjac;
            alkPiceTMP.Vrsta = updatedPice.Vrsta;
            alkPiceTMP.ProcenatAlkohola = updatedPice.ProcenatAlkohola;
            alkPiceTMP.Litraza = updatedPice.Litraza;
            
            _context.AlkoholnaPica.Update(alkPiceTMP);
            await _context.SaveChangesAsync();


            return Ok(alkPiceTMP);
        }

        return BadRequest("Neuspesno promenjen proizvod, ne postoji proizvod sa tim ID-jem u bazi podataka!");
    }

    [HttpGet]
    [Route("GetAlkohol/{idAlk}")]

    public async Task<IActionResult> GetAlkohol(int idAlk)
    {
        var alkTMP = await _context.AlkoholnaPica.Where(p => p.ID == idAlk).FirstAsync();

        if (alkTMP != null)
        {
            return Ok(alkTMP);
        }

        return BadRequest("Ne postoji alkholno pice sa tim id-jem");
    }

    [HttpDelete, Authorize(Roles = "Admin")]
    [Route("DeleteAlkohol/{idAlk}")]

    public async Task<IActionResult> DeleteAlkohol(int idAlk)
    {
        
        try
        {
            var alkTMP = await _context.AlkoholnaPica.Where(p => p.ID == idAlk).FirstAsync();

            _context.AlkoholnaPica.Remove(alkTMP);

            await _context.SaveChangesAsync();

            return Ok($"Uspesno izbrisano alkoholno pice sa indeksom {alkTMP.ID}");
        }
        catch (Exception ec)
        {
            return BadRequest(ec.Message);
        }
    }

    [HttpGet]
    [Route("PrikaziHomeAlkoholnaPica")]

    public async Task<IActionResult> PrikaziHomeAlkoholnaPica()
    {
        var alkPica = await _context.AlkoholnaPica
        .OrderByDescending(e => e.VremeDodavanja)
        .Take(4)
        .ToListAsync();

        return Ok(alkPica);
    }
}