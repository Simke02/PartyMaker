namespace Aplikacija.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PotrosacController : Controller
{
    private readonly PartyMakerContext _context;

    private readonly IConfiguration _configuration;
    public PotrosacController(PartyMakerContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost]
    [Route("DodajPotrosaca")]

    public async Task<IActionResult> DodajPotrosaca([FromBody] Aplikacija.UserReqRegister request)
    {

        bool postoji = _context.Potrosaci.Any(p => p.email == request.email);
        bool postojiAdmin = _context.Administratori.Any(p => p.email == request.email);

            if(postoji || postojiAdmin)
            {
                return BadRequest("EMAIL_EXISTS");
            }
            else
            {
                Potrosac noviNalog = new Potrosac
                {
                    email = "string",
                    LicnoIme = "string",
                    Prezime = "string",
                    password = "string",
                    Admin = false,
                    Adresa = "string",
                    Grad = "string",
                    Drzava = "string",
                    BrojTelefona = "string",
                    PostanskiBroj = "string"
                };

                noviNalog.email = request.email;
                noviNalog.password = request.password;

                noviNalog.LicnoIme = request.LicnoIme;
                noviNalog.Prezime = request.Prezime;
                noviNalog.Admin = false;

                await _context.Nalozi.AddAsync(noviNalog);
                await _context.SaveChangesAsync();

                string tipNaloga = "User";

                if(noviNalog.Admin == true)
                {
                    tipNaloga = "Admin";
                }
                else
                {
                    tipNaloga = "User";
                }
                
                string token = CreateToken(noviNalog, tipNaloga);
                return Ok(token);
            }
                    
    }

    [HttpGet]
    [Route("PrikaziPotrosace")]

    public async Task<IActionResult> PrikaziPotrosace()
    {
        var listaPotrosaca = await _context.Potrosaci.ToListAsync();

        if(listaPotrosaca != null)
        {
            return Ok(listaPotrosaca);
        }

        return BadRequest("Lista potrosaca je prazna");
    } 

    [HttpGet, Authorize(Roles = "User")]
    [Route("VratiKorisnika/{email}")]
    
    public async Task<IActionResult> VratiKorisnika(string email)
    {
        var korisnik = await _context.Potrosaci.Where(p => p.email == email).FirstAsync();

        if (korisnik != null)
        {
            return Ok(korisnik);
        }

        return BadRequest("Ne postoji potrosac u bazi sa datim emailom!");
    }

    [HttpPut]
    [Route("AzurirajPotrosaca/{email}")]
    
    public async Task<IActionResult> AzurirajPotrosaca([FromBody] Potrosac user, string email)
    {
        try
        {
            var currentPotrosac = await _context.Potrosaci.Where(p => p.email == email).FirstAsync();

            if(currentPotrosac != null)
            {
                currentPotrosac.password = user.password;
                currentPotrosac.email = user.email;
                currentPotrosac.LicnoIme = user.LicnoIme;
                currentPotrosac.Prezime = user.Prezime;
                currentPotrosac.Admin = false;
                currentPotrosac.Adresa = user.Adresa;
                currentPotrosac.BrojTelefona = user.BrojTelefona;
                currentPotrosac.Grad = user.Grad;
                currentPotrosac.Drzava = user.Drzava;
                currentPotrosac.PostanskiBroj = user.PostanskiBroj;
                

                _context.Potrosaci.Update(currentPotrosac);

                await _context.SaveChangesAsync();

                return Ok(currentPotrosac);
            }

            return BadRequest("Korisnik sa datom email adresom ne postoji!");

        }
        catch (Exception ec)
        {
            return BadRequest(ec.Message);
        }
        
    }

    [HttpDelete]
    [Route("DeleteUser/{email}")]

    public async Task<IActionResult> DeleteUser(string email)
    {
        try
        {
            var findUser = await _context.Potrosaci.Where(p => p.email == email).FirstAsync();

            _context.Potrosaci.Remove(findUser);

            await _context.SaveChangesAsync();

            return Ok($"Uspesno obrisan korisnik sa email-om {findUser.email}");
        }
        catch(Exception ec)
        {
            return BadRequest(ec.Message);
        }
    }

    private string CreateToken(Nalog user, string tipNaloga)
    {
        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
            new Claim(ClaimTypes.Email, user.email),
            new Claim(ClaimTypes.Role, $"{tipNaloga}")
        };

        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
            _configuration.GetSection("AppSettings:Token").Value));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }

}