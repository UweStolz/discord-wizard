CREATE TABLE IF NOT EXISTS statistics (
    ID INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name varchar(20) UNIQUE NOT NULL,
    count INT NOT NULL DEFAULT 0
)
