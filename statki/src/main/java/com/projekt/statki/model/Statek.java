package com.projekt.statki.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class Statek {
    private final UUID id;
    private final String kolor;
    private double X;
    private double Y;



    public Statek(@JsonProperty("id") UUID id, @JsonProperty("kolor")String kolor) {
        this.id = id;
        this.kolor = kolor;
        this.X = 0;
        this.Y = 0;
    }

    public UUID getId() {
        return id;
    }

    public String getKolor() {
        return kolor;
    }

    public double getX() {
        return X;
    }

    public void setX(double x) {
        X = x;
    }

    public double getY() {
        return Y;
    }

    public void setY(double y) {
        Y = y;
    }
}
