namespace Aplikacija.Controllers;

[ApiController]
[Route("/api/[controller]")]


public class NalogController : Controller
{
    private readonly PartyMakerContext _context;
    private readonly IConfiguration _configuration;
    public NalogController(PartyMakerContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }


    [HttpGet]
    [Route("VratiNalog/{email}")]

    public async Task<IActionResult> VratiNalog(string email)
    {
        var tmpNalog = await _context.Nalozi.Where(p => p.email == email).FirstAsync();
        
        if (tmpNalog != null)
        {
            return Ok(tmpNalog);
        }

        return BadRequest("Ne postoji nalog sa ovom sifrom u bazi");
    }


    [HttpPost]
    [Route("DodajNalog")]

    public async Task<IActionResult> DodajNalog([FromBody] Nalog nalog)
    {
        await _context.Nalozi.AddAsync(nalog);
        await _context.SaveChangesAsync();

        return Ok(nalog);
    }

    [HttpPost]
    [Route("LogIn")]

    public async Task<IActionResult> Login([FromBody] Aplikacija.LoginReq request)
    {
        bool postoji = _context.Nalozi.Any(p=>p.email == request.email);
       
        if(postoji)
        {
            var userTMP = await _context.Nalozi.Where(p => p.email == request.email).FirstAsync();
           
            if(request.password != userTMP.password)
            {
                return BadRequest("INVALID_PASSWORD");
            }

            string tipNaloga = "User";

            if(userTMP.Admin == true)
            {
                tipNaloga = "Admin";
            }
            else
            {
                tipNaloga = "User";
            }
            

            string token = CreateToken(userTMP, tipNaloga);
            return Ok(token);

        }

        return BadRequest("EMAIL_NOT_FOUND");
    }

    private string CreateToken(Nalog user, string tipNaloga)
    {
        List<Claim> claims = new List<Claim>
        {
            new Claim("localID", user.ID.ToString()),
            new Claim("email", user.email),
            new Claim("role", $"{tipNaloga}")
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