namespace AptitudeTestServer.Models;

public class Quote
{
    public int Id { get; set; }
    public string Name { get; set; }
    // How should this get calculated?
    public decimal Premium { get; set; }
    public decimal Tiv { get; set; }
    public int StateId { get; set; }
    public State? State { get; set; }
}