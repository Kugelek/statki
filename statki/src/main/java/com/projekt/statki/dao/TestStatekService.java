//package com.projekt.statki.dao;
//
//import com.projekt.statki.model.Statek;
//import org.springframework.stereotype.Repository;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//import java.util.UUID;
//
//@Repository("testDao")
//public class TestStatekService implements StatekDao{
//    private static List<Statek> db = new ArrayList<>();
//
//    @Override
//    public int insertStatek(UUID id, Statek statek) {
//        db.add(new Statek(id,statek.getKolor()));
//        return 0;
//    }
//
//    @Override
//    public List<Statek> selectAllStateks() {
//        return db;
//    }
//
//    @Override
//    public Optional<Statek> selectStatekById(UUID id) {
//        return db.stream()
//                .filter(statek -> statek.getId().equals(id))
//                .findFirst();
//    }
//
//    @Override
//    public int deleteStatekById(UUID id) {
//        Optional<Statek> statek = selectStatekById(id);
//        if(statek.isEmpty()){
//            return 0;
//        }
//        db.remove(statek.get());
//        return 1;
//    }
//
//    @Override
//    public int updateStatekColorById(UUID id, Statek statek) {
//        return 0;
//    }
//
//    @Override
//    public int updateStatekById(UUID id, Statek statekUpdate) {
//        return selectStatekById(id)
//                .map(statek->{
//                    int indexOfStatekToUpdate = db.indexOf(statek);
//                    if (indexOfStatekToUpdate>=0){
//                        db.set(indexOfStatekToUpdate,new Statek(id, statekUpdate.getKolor()));
//                        return 1;
//                    }
//                    else
//                        return 0;
//                })
//                .orElse(0);
//    }
//}
