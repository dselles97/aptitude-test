using AptitudeTestServer.Data;
using AptitudeTestServer.Models;
using AptitudeTestServer.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AptitudeTestServer.Controllers;

[ApiController]
[Route("api/quotes")]
public class QuotesController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<QuotesController> _logger;
    
    public QuotesController(ApplicationDbContext context, ILogger<QuotesController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var quotes = await _context.Quotes
            .Select(q => new QuoteDto(
                q.Id,
                q.Name,
                q.Premium,
                q.State.Rate,
                q.Tiv,
                q.State.Abbreviation,
                q.State.Id))
            .ToListAsync();
        return Ok(quotes);
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var quote = await _context.Quotes
                .Select(q => new QuoteDto(
                    q.Id,
                    q.Name,
                    q.Premium,
                    q.State.Rate,
                    q.Tiv,
                    q.State.Abbreviation,
                    q.State.Id))
                .FirstOrDefaultAsync(q => q.Id == id);
        return Ok(quote);
    }
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateQuote([FromRoute] int id, [FromBody] Quote quote)
    {
        var findQuote = await _context.Quotes.FindAsync(id);
        if(findQuote != null && findQuote.Id == id){
            findQuote.Premium = quote.Premium;
            if (findQuote.State is not null)
            {
                findQuote.State.Rate = quote.State.Rate;
                findQuote.State.Abbreviation = quote.State.Abbreviation;
            }
            findQuote.StateId = quote.StateId;
            findQuote.Name = quote.Name;
            findQuote.Tiv = quote.Tiv;
            await _context.SaveChangesAsync();
        }
        return Ok(findQuote);   
    }
    // Implement POST
    [HttpPost]
    public async Task<IActionResult> SaveQuote([FromForm] string name, [FromForm] string state, [FromForm] int tiv)
    {
        Quote quote = new Quote();
        if (!string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(state)) {
            quote.Name = name.Trim();
            quote.Tiv = tiv;
            var stateAbbreviation = await _context.States.Where(q => q.Abbreviation == state).FirstOrDefaultAsync();
            if (stateAbbreviation is not null)
            {
                quote.State = stateAbbreviation;
                quote.StateId = stateAbbreviation.Id;
                quote.Premium = (tiv * stateAbbreviation.Rate) * 100;
            }
            _context.Quotes.Add(quote);
            await _context.SaveChangesAsync();
        }
        return Ok(quote);
    }
    
    
    // Implement PUT
    
    // To supply a select / dropdown?
    [HttpGet("states")]
    public async Task<IActionResult> GetAllStates()
    {
        var states = await _context.States
            .OrderBy(state => state.Abbreviation)
            .Select(state => new StateDto(state.Id, state.Abbreviation))
            .ToListAsync();
        return Ok(states);
    }
}