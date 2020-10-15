package com.projekt.statki.service;

import com.projekt.statki.dao.StatekDao;
import com.projekt.statki.model.Statek;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StatekService {
    private final StatekDao statekDao;

    @Autowired
    public StatekService(@Qualifier("testDao") StatekDao statekDao) {
        this.statekDao = statekDao;
    }

    public int addStatek(Statek statek){
        return  statekDao.insertStatek(statek);
    }
    public List<Statek> getAllStateks(){
        return statekDao.selectAllStateks();
    }
    public Optional<Statek> getStatekById(UUID id){
        return  statekDao.selectStatekById(id);
    }
    public int deleteStatek(UUID id){
        return statekDao.deleteStatekById(id);
    }
    public int updateStatek(UUID id, Statek statek){
        return  statekDao.updateStatekById(id,statek);
    }
}
