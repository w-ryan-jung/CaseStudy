package se.lth.base.server.foo;

/**
 * Data class for the starting functionality.
 *
 * @author Rasmus Ros, rasmus.ros@cs.lth.se
 * @see FooDataAccess
 */
public class Foo {

    private final int id;
    private final int userId;
    //private final String payload;
    private final long created;

    private final String cityName;
    private final String productName;
    private final int amount;

    public Foo(int id, int userId, long created, String cityName, String productName, int amount) {
        this.id = id;
        this.userId = userId;
        //this.payload = payload;
        this.created = created;

        this.cityName = cityName;
        this.productName = productName;
        this.amount = amount;

    }

    public int getId() {
        return id;
    }

    public int getUserId() {
        return userId;
    }

    /*
    public String getPayload() {
        return payload;
    }*/

    public long getCreated() {
        return created;
    }

    public String getCityName() {
        return cityName;
    }

    public String getProductName() {
        return productName;
    }

    public int getAmount() {
        return amount;
    }
}


