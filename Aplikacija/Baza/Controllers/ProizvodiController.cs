namespace Aplikacija.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]

    public class ProizvodiController : Controller
    {
        private readonly PartyMakerContext _context;
        public ProizvodiController(PartyMakerContext context)
        {
            _context = context;
        }


        [HttpGet]
        [Route("sviProizvodi")]   
        public async Task<IActionResult> getSveProizvode()
        {
           var proizvodi = await _context.Proizvodi.ToListAsync();
        
            return Ok(proizvodi);
        }

        [HttpPost]
        [Route("dodajProizvodSAMOTESTIRANJE")]

        public async Task<IActionResult> dodajProizvod([FromBody] Proizvod proizvodRequest)
        {
            await _context.Proizvodi.AddAsync(proizvodRequest);
            await _context.SaveChangesAsync();

            return Ok(proizvodRequest);

        }

        [HttpPut]
        [Route("IzmeniDostupnuKolicinu/{idProiz}")]

        public async Task<IActionResult> IzmeniDostupnuKolicinu(int idProiz, [FromBody] Proizvod updatedProiz)
        {
            var proizTMP = await _context.Proizvodi.Where(p => p.ID == idProiz).FirstAsync();


            if (proizTMP != null)
            {
                proizTMP.DostupnaKolicina = updatedProiz.DostupnaKolicina;
            
                _context.Proizvodi.Update(proizTMP);
                await _context.SaveChangesAsync();


                return Ok(proizTMP);
            }

            return BadRequest("Neuspesno promenjen proizvod, ne postoji proizvod sa tim ID-jem u bazi podataka!");
        }

        [HttpGet]
        [Route("GetProizvod/{idProizvod}")]

        public async Task<IActionResult> GetProizvod(int idProizvod)
        {
            var proizvodTMP = await _context.Proizvodi.Where(p => p.ID == idProizvod).FirstAsync();

            if (proizvodTMP != null)
            {
                return Ok(proizvodTMP);
            }

            return BadRequest("Ne postoji proizvod sa tim id-jem");
        }
    }
}