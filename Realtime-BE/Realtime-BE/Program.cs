

using BussinessObject;
using Realtime_BE;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors(o => o.AddPolicy("CorsPolicy", b =>
{
    b.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
}));
builder.Services.AddSingleton<IDictionary<string, User>>(opts => new Dictionary<string, User>());
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.UseCors("CorsPolicy");
app.MapHub<MessageHub>("/chathub");

app.MapControllers();

app.Run();
