-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(40) NOT NULL,
    "last_name" VARCHAR(40) NOT NULL,
    "username" VARCHAR(40) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "password" VARCHAR(225) NOT NULL,
    "balance" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "remember_token" VARCHAR(225),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_password_reset" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "token" VARCHAR(225) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_password_reset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drafts" (
    "id" SERIAL NOT NULL,
    "campaign_name" VARCHAR(20) NOT NULL,
    "section" VARCHAR(40) NOT NULL,
    "message" VARCHAR(225) NOT NULL,
    "latest_edits" VARCHAR(40) NOT NULL,
    "usergroup" VARCHAR(40) NOT NULL,
    "equipment" VARCHAR(40) NOT NULL,
    "managements" VARCHAR(40) NOT NULL,
    "recipient_type" VARCHAR(40) NOT NULL,
    "upload_image" VARCHAR(40) NOT NULL,
    "upload_file" VARCHAR(40) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "drafts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_schedules" (
    "id" SERIAL NOT NULL,
    "draft_id" INTEGER NOT NULL,
    "type" VARCHAR(40) NOT NULL,
    "datetime_send" TIMESTAMP(6) NOT NULL,
    "machine" VARCHAR(45) NOT NULL,
    "status" VARCHAR(45) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "campaign_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_reports" (
    "id" SERIAL NOT NULL,
    "draft_id" INTEGER NOT NULL,
    "delivery_schedules" TIMESTAMP(6) NOT NULL,
    "players" VARCHAR(45) NOT NULL,
    "credits" VARCHAR(45) NOT NULL,
    "message_send_results" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "campaign_reports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "campaign_schedules" ADD CONSTRAINT "campaign_schedules_draft_id_fkey" FOREIGN KEY ("draft_id") REFERENCES "drafts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_reports" ADD CONSTRAINT "campaign_reports_draft_id_fkey" FOREIGN KEY ("draft_id") REFERENCES "drafts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
