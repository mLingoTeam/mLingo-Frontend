FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
ENV ASPNETCORE_URLS http://+:8080
EXPOSE 8888


FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build

# Fetch and install Node 10. Make sure to include the --yes parameter 
# to automatically accept prompts during install, or it'll fail.
RUN curl --silent --location https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install --yes nodejs

WORKDIR /src
COPY ["mLingo/mLingo.csproj", "mLingo/"]
COPY ["mLingoCore/mLingoCore.csproj", "mLingoCore/"]
RUN dotnet restore "mLingo/mLingo.csproj"
COPY . .
WORKDIR "/src/mLingo"
RUN dotnet build "mLingo.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "mLingo.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "mLingo.dll"]