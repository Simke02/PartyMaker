namespace Aplikacija.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class AdministratorController : Controller
{
    private readonly PartyMakerContext _context;

    public AdministratorController(PartyMakerContext context)
    {
        _context = context;
    }

    [HttpPost]
    [Route("DodajAdministratora")]

    public async Task<IActionResult> DodajAdministratora([FromBody] Aplikacija.AdminReqRegister request) 
    {

        bool postoji = _context.Potrosaci.Any(p => p.email == request.email);
        bool postojiAdmin = _context.Administratori.Any(p => p.email == request.email);

            if(postoji || postojiAdmin)
            {
                return BadRequest("EMAIL_EXISTS");
            }
            else
            {
                Administrator noviAdmin = new Administrator
                {
                    email = "string",
                    password = "string",
                    LicnoIme = "string",
                    Prezime = "string",
                    Admin = true,
                    Pozicija = "string",
                    JMBG = "string"
                };

                noviAdmin.email = request.email;
                noviAdmin.password = request.password;
                noviAdmin.LicnoIme = request.LicnoIme;
                noviAdmin.Prezime = request.Prezime;
                noviAdmin.Admin = request.Admin;
                noviAdmin.Pozicija = request.Pozicija;
                noviAdmin.JMBG = request.JMBG;


                await _context.Administratori.AddAsync(noviAdmin);
                await _context.SaveChangesAsync();

                return Ok(noviAdmin);
            }       
    }

    [HttpGet]
    [Route("PrikaziAdministratore")]

    public async Task<IActionResult> PrikaziAdministratore()
    {
        var listaAdmina = await _context.Administratori.ToListAsync();

        if(listaAdmina != null)
        {
            return Ok(listaAdmina);
        }

        return BadRequest("Lista admina je prazna!");
    }
    
    [HttpGet]
    [Route("VratiAdmina/{email}")]

    public async Task<IActionResult> VratiAdmina(string email)
    {
        var admin = await _context.Administratori.Where(p => p.email == email).FirstAsync();

        if (admin != null)
        {
            return Ok(admin);
        }

        return BadRequest("Ne postoji admin u bazi sa datim emailom!");
    }

    [HttpPut]
    [Route("AzurirajAdmina/{email}")]
    
    public async Task<IActionResult> AzurirajAdmina([FromBody] Administrator admin, string email)
    {
        try
        {
            var currentAdmin = await _context.Administratori.Where(p => p.email == email).FirstAsync();

            if(currentAdmin != null)
            {
                currentAdmin.password = admin.password;
                currentAdmin.email = admin.email;
                currentAdmin.LicnoIme = admin.LicnoIme;
                currentAdmin.Prezime = admin.Prezime;
                currentAdmin.Admin = true;
                currentAdmin.Pozicija = admin.Pozicija;
                currentAdmin.JMBG = admin.JMBG;

                _context.Administratori.Update(currentAdmin);

                await _context.SaveChangesAsync();

                return Ok(currentAdmin);
            }

            return BadRequest("Admin sa datom email adresom ne postoji!");

        }
        catch (Exception ec)
        {
            return BadRequest(ec.Message);
        }
        
    }

    [HttpDelete]
    [Route("DeleteAdmin/{email}")]

    public async Task<IActionResult> DeleteAdmin(string email)
    {
        try
        {
            var findAdmin = await _context.Administratori.Where(p => p.email == email).FirstAsync();

            _context.Administratori.Remove(findAdmin);

            await _context.SaveChangesAsync();

            return Ok($"Uspesno obrisan admin sa email-om {findAdmin.email}");
        }
        catch(Exception ec)
        {
            return BadRequest(ec.Message);
        }
    }
}