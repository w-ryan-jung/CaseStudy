package se.lth.base.server.report;

import se.lth.base.server.database.DataAccess;
import se.lth.base.server.database.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class ReportDataAccess extends DataAccess<Report> {
    private static final class ReportMapper implements Mapper<Report> {
        @Override
        public Report map(ResultSet resultSet) throws SQLException {
            return new Report(resultSet.getString("cityName"),
                    resultSet.getString("productName"),
                    resultSet.getInt("total"));
        }
    }
    public ReportDataAccess(String driverUrl) {
        super(driverUrl, new ReportMapper());
    }

    public List<Report> getTotalStock(){
        return query("SELECT cityName, productName, SUM(amount) AS total FROM foo GROUP BY cityName, productName");
    }
}
