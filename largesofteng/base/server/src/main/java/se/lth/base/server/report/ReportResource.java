package se.lth.base.server.report;

import se.lth.base.server.Config;
import se.lth.base.server.user.Role;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("report")
public class ReportResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    @RolesAllowed(Role.Names.ADMIN)
    public List<Report> getTotalStock() {
        return new ReportDataAccess(Config.instance().getDatabaseDriver()).getTotalStock();
    }
}
