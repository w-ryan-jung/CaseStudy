package se.lth.base.server.foo;

import se.lth.base.server.user.UserDataAccess;
import se.lth.base.server.database.DataAccess;
import se.lth.base.server.database.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

/**
 * FooDataAccess is a place-holder that shows how the base system can be extended with additional functionality.
 * <p>
 * Note that the name 'FooDataAccess' is not very good, since it is generic. In your project you are expected to give
 * more specific names to your classes, see for example @{@link UserDataAccess} which is more aptly named.
 *
 * @author Rasmus Ros, rasmus.ros@cs.lth.se
 * @see UserDataAccess
 * @see DataAccess
 */
public class FooDataAccess extends DataAccess<Foo> {

    private static final class FooMapper implements Mapper<Foo> {
        // Feel free to change this to a lambda expression
        @Override
        public Foo map(ResultSet resultSet) throws SQLException {
            return new Foo(resultSet.getInt("foo_id"),
                    resultSet.getInt("user_id"),
                    resultSet.getObject("created", Date.class).getTime(),
                    resultSet.getString("productName"),
                    resultSet.getString("cityName"),
                    resultSet.getInt("amount"));
        }
    }

    public FooDataAccess(String driverUrl) {
        super(driverUrl, new FooMapper());
    }

    /**
     * Add new foo payload connected to a user.
     *
     * @param userId  user to add payload to.
     * @param payload new payload to append.
     * @return the created foo object, containing additionally created date and the id of the foo.
     */
    public Foo addFoo(int userId, String productName, String cityName, int amount) {
        long created = System.currentTimeMillis();
        int fooId = insert("INSERT INTO foo (user_id, productName, cityName, amount, created) VALUES (?,?,?,?,?)",
                userId, productName, cityName, amount, new Date(created));
        return new Foo(fooId, userId, created, productName, cityName, amount);
    }

    /**
     * @return all foo payload for all users.
     */
    public List<Foo> getAllFoo() {
        return query("SELECT * FROM foo");
    }

    /**
     * Get all foo payload created by a user.
     *
     * @param userId user to filter on.
     * @return users foo objects.
     */
    public List<Foo> getUsersFoo(int userId) {
        return query("SELECT * FROM foo WHERE user_id = ?", userId);
    }

    public List<Foo> getAllFooGroupByCity(){
        return query("SELECT * FROM foo ORDER BY cityName");
    }
    public List<Foo> getAllFooGroupByProduct(){
        return query("SELECT productName, cityName, SUM(amount) AS amount, created FROM foo GROUP BY productName");
    }
}
