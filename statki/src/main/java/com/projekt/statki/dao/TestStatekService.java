package com.projekt.statki.dao;

import com.projekt.statki.model.Statek;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository("testDao")
public class TestStatekService implements StatekDao{
    private static List<Statek> db = new ArrayList<>();

    @Override
    public int insertStatek(UUID id, Statek statek) {
        db.add(new Statek(id,statek.getName()));
        return 0;
    }

    @Override
    public List<Statek> selectAllStateks() {
        return db;
    }
}
