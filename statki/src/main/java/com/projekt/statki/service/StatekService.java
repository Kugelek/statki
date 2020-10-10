package com.projekt.statki.service;

import com.projekt.statki.dao.StatekDao;
import com.projekt.statki.model.Statek;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
