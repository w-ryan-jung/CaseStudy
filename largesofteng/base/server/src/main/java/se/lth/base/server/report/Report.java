package se.lth.base.server.report;

public class Report {
    private final String cityName;
    private final String productName;
    private final int total;

    public Report(String cityName, String productName, int total) {
        this.cityName = cityName;
        this.productName = productName;
        this.total = total;

    }
}
