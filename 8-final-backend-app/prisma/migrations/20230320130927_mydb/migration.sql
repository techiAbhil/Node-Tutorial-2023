-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL,
    `first_name` VARCHAR(45) NULL,
    `last_name` VARCHAR(45) NULL,
    `email` VARCHAR(145) NOT NULL,
    `password` VARCHAR(200) NOT NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
