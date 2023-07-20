import { logger } from "../config/logger";
import { get, isEmpty } from "lodash";
import { ResponseHelper, CryptoHelper, EmailHelper, SMSHelper } from "../utils";
import {
  EmailTemplate,
  User,
  Product,
  UserSession,
  Role,
  sequelize,
  BusinessUnit,
  Otp,
  BusinessEntity,
} from "../model";
import { defaultMessage } from "../utils/constant";
import { Op, QueryTypes } from "sequelize";

import {
  aisoDomainURL,
  chatCount,
  chatRoleId,
  systemUserId,
  userLoginAttempts,
} from "config";
const ST = require("stjs");
const generatePassword = require("generate-password");

export class ProductService {
  
  constructor() {
    this.responseHelper = new ResponseHelper();
    this.cryptoHelper = new CryptoHelper();
    this.emailHelper = new EmailHelper();
    this.smsHelper = new SMSHelper();
  }

  async addProduct(req, res) {
    const t = await sequelize.transaction();
    try {
      console.log("req.body------->", req.body);
      const response = await Product.create({productNo:req?.body?.productNo,productName:req?.body?.productName,
        productDesc:req?.body?.productDesc,productPrice:req?.body?.productPrice}, { transaction: t,logging:true })
      await t.commit()
      logger.debug("user added successfully");
      return this.responseHelper.onSuccess(
        res,
        "user added successfully",
        response
      );
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return this.responseHelper.notFound(res, defaultMessage.NOT_FOUND);
      } else {
        logger.error(error, defaultMessage.NOT_AUTHORIZED);
        return this.responseHelper.notAuthorized(
          res,
          new Error("No addedd")
        );
      }
    } finally {
      if (t && !t.finished) {
        await t.rollback();
      }
    }
  }

  async updateProduct(req, res) {
    const t = await sequelize.transaction();
    try {
      console.log("req.body------xxx->", req.body);
      const response = await Product.update(
        { productName: req?.body?.productName }, // Update the contact_no value
        {
          where: { pId: req?.body?.pId }, // Specify the condition for the update
          transaction: t,
          logging: true
        }
      );
            await t.commit()
      logger.debug("user update successfully");
      return this.responseHelper.onSuccess(
        res,
        "user update---- successfully",
        response
      );
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return this.responseHelper.notFound(res, defaultMessage.NOT_FOUND);
      } else {
        logger.error(error, defaultMessage.NOT_AUTHORIZED);
        return this.responseHelper.notAuthorized(
          res,
          new Error("No addedd")
        );
      }
    } finally {
      if (t && !t.finished) {
        await t.rollback();
      }
    }
  }
}