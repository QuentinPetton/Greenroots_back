BEGIN;

DROP TABLE IF EXISTS order_line CASCADE; 
DROP TABLE IF EXISTS orders CASCADE; 
DROP TABLE IF EXISTS campaign_locations CASCADE; 
DROP TABLE IF EXISTS country CASCADE; 
DROP TABLE IF EXISTS bookmarks CASCADE; 
DROP TABLE IF EXISTS campaigns CASCADE; 
DROP TABLE IF EXISTS trees CASCADE; 
DROP TABLE IF EXISTS tree_species CASCADE; 
DROP TABLE IF EXISTS reviews CASCADE; 
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS campaign_trees CASCADE;


CREATE TABLE "roles" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "name" VARCHAR(20) NOT NULL UNIQUE,
    "role_description" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "users" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(60) NOT NULL,
    "phone_number" INT,
    "street_number" INT NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "postal_code" VARCHAR(10) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "entity_name" VARCHAR(255),
    "entity_type" VARCHAR(50),
    "entity_siret" VARCHAR(14),
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "id_role" INT NOT NULL,
    FOREIGN KEY ("id_role") REFERENCES "roles"("id")
);

CREATE TABLE "reviews" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "content" VARCHAR(255),
    "rating" INT NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "id_user" INT NOT NULL,
    FOREIGN KEY ("id_user") REFERENCES "users"("id")
);

CREATE TABLE "tree_species" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "description" TEXT NOT NULL,
    "species_name" VARCHAR(255) NOT NULL UNIQUE,
    "co2_absorption" INT NOT NULL,
    "average_lifespan" INT NOT NULL
);

CREATE TABLE "trees" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "name" VARCHAR(255) NOT NULL,
    "price_ht" NUMERIC(10,2),
    "quantity" INT,
    "age" INT NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "id_species" INT,
    FOREIGN KEY ("id_species") REFERENCES "tree_species"("id")
);

CREATE TABLE "country" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "name" VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE "campaign_locations" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "name_location" VARCHAR(255) NOT NULL,
    "id_country" INT NOT NULL,
    FOREIGN KEY ("id_country") REFERENCES "country"("id")
);

CREATE TABLE "campaigns" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "start_campaign" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "end_campaign" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "id_location" INT,
    FOREIGN KEY ("id_location") REFERENCES "campaign_locations"("id")
);

CREATE TABLE "campaign_trees" (
  "id_campaign" INT NOT NULL,
  "id_tree" INT NOT NULL,
  PRIMARY KEY ("id_campaign", "id_tree"),
  FOREIGN KEY ("id_campaign") REFERENCES "campaigns"("id"),
  FOREIGN KEY ("id_tree") REFERENCES "trees"("id")
);

CREATE TABLE "bookmarks" (
    "id_user" INT NOT NULL,
    "id_campaign" INT NOT NULL,
    PRIMARY KEY ("id_user", "id_campaign"),
    FOREIGN KEY ("id_user") REFERENCES "users"("id"),
    FOREIGN KEY ("id_campaign") REFERENCES "campaigns"("id")
);

CREATE TABLE "orders" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "total_amount" NUMERIC(10,2) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "order_number" VARCHAR(50) NOT NULL UNIQUE,
    "id_user" INT NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("id_user") REFERENCES "users"("id")
);

CREATE TABLE "order_line" (
    "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "price_ht_at_order" NUMERIC(10,2) NOT NULL,
    "quantity" INT NOT NULL,
    "total_amount" NUMERIC(10,2) NOT NULL,
    "id_order" INT NOT NULL,
    "id_tree" INT NOT NULL,
    "id_campaign" INT NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("id_order") REFERENCES "orders"("id"),
    FOREIGN KEY ("id_tree") REFERENCES "trees"("id"),
    FOREIGN KEY ("id_campaign") REFERENCES "campaigns"("id")
);

COMMIT;
