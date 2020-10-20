package com.projekt.statki.dao;

import com.projekt.statki.model.Statek;

import java.time.Period;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StatekDao {
    int  insertStatek(UUID id , Statek statek);
    default int insertStatek(Statek statek){
        UUID id = UUID.randomUUID();
        return  insertStatek(id,statek);
    }
    List<Statek> selectAllStateks();

    Optional<Statek> selectStatekById(UUID id);

    int deleteStatekById(UUID id);

    int updateStatekColorById(UUID id, Statek statek);

    int updateStatekById(UUID id, Statek statek);
}
