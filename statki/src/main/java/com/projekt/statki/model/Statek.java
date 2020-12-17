package com.projekt.statki.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class Statek {
    private final UUID id = UUID.randomUUID();
    private String kolor = "placeholder";
    private double X = 0;
    private double Y = 0;

    public Statek() {}

    public Statek(String kolor) {
        this.kolor = kolor;
        this.X = 0;
        this.Y = 0;
    }

    public Statek(@JsonProperty("id") UUID id, @JsonProperty("kolor")String kolor) {
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
