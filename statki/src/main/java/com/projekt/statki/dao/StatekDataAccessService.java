package com.projekt.statki.dao;

import com.projekt.statki.model.Statek;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("postgres")
public class StatekDataAccessService implements StatekDao {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StatekDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertStatek(UUID id, Statek statek) {
        String sql = "INSERT INTO statek(id,kolor) VALUES (?,?)";
        jdbcTemplate.update(sql,id,statek.getKolor());
        return 0;
    }

    @Override
    public List<Statek> selectAllStateks() {
        String sql = "SELECT * FROM statek";
        return jdbcTemplate.query(sql, (resultSet, i) -> {
            UUID id = UUID.fromString(resultSet.getString("id"));
            String kolor = resultSet.getString("kolor");
            return new Statek(id, kolor);
        });
    }

    @Override
    public Optional<Statek> selectStatekById(UUID id) {
        String sql = "SELECT * FROM statek WHERE id = ?";
        Statek statek = jdbcTemplate.queryForObject(sql,
                new Object[]{id},
                (resultSet, i) -> {
            UUID statekId = UUID.fromString(resultSet.getString("id"));
            String kolor = resultSet.getString("kolor");
            return new Statek(statekId, kolor);
        });
    return Optional.ofNullable(statek);
    }

    @Override
    public int deleteStatekById(UUID id) {
        String sql = "DELETE FROM statek WHERE id =?";
        jdbcTemplate.update(sql,id);
        return 0;
    }
    @Override
    public int updateStatekColorById(UUID id, Statek statek) {
        String sql = "UPDATE statek SET kolor = ? WHERE id =?";
        jdbcTemplate.update(sql,statek.getKolor(),id);
        return 0;
    }

    @Override
    public int updateStatekById(UUID id, Statek statek) {
        String sql = "UPDATE statek SET X = ?, Y = ? WHERE id =?";
        jdbcTemplate.update(sql,statek.getX(),statek.getY(),id);
        return 0;
    }
}
