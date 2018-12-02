# SHOPEE API TEST

## HOW TO RUN?? 

- for development : docker-compose up 
- for testcase : docker-compose -f docker-compose-test.yml up

## API DOCS

import this on your API tools or POSTMAN
- https://documenter.getpostman.com/view/889758/Rzfdqr3U

or
- https://www.getpostman.com/collections/3a87d1f68343f83e4fe3

# API FLOW

Description : 
1. Get taxes from transaction and saved it to database

## MYSQL Structure

### TAX

Tax history by transaction

#### Columns

- `ID`
  - Description: ID that contain milisecond of utftime
  - Type: decimal(18,0)
  - Indexed: true
- `name`
  - Description: name of current item 
  - Type: varchar(255)
- `tax_code`
  - Description: tax code of current item
  - Type: int(11)
- `price`
    - Description: price of current item
    - Type: decimal(18,2)

#### Example

| ID            | name         | tax_code   | price |
| ------------- | ------------ | ---------- | ----  |
| 1543745772073 | Big mac      | 1          | 2000  |
| 1543745772073 | Lucky Strike | 2          | 1000  |
| 1543745772073 | Happy puppy  | 3          | 3000  |
