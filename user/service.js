import { logger } from "../config/logger";
import { get, isEmpty } from "lodash";
import { ResponseHelper, CryptoHelper, EmailHelper, SMSHelper } from "../utils";
import {
  EmailTemplate,
  User,
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

export class UserService {
  
  constructor() {
    this.responseHelper = new ResponseHelper();
    this.cryptoHelper = new CryptoHelper();
    this.emailHelper = new EmailHelper();
    this.smsHelper = new SMSHelper();
  }

  async addUser(req, res) {
    const t = await sequelize.transaction();
    try {
      console.log("req.body------->", req.body);
      const response = await User.create({contactNo:req?.body?.contactNo,name:req?.body?.name,}, { transaction: t,logging:true })
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




  async updateUser(req, res) {
    const t = await sequelize.transaction();
    try {
      console.log("req.body------xxx->", req.body);
      const response = await User.update(
        { contactNo: req?.body?.contactNo }, // Update the contact_no value
        {
          where: { id: req?.body?.id }, // Specify the condition for the update
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


  async getUser(req, res) {
    const t = await sequelize.transaction();
    try {
      console.log("req.body------xxx->", req.body);
      const response = await User.findOne({
        where: { id: req?.body?.id }, 
         attributes: ['id', 'name', 'contactNo'] 
        
      });

      // const response=await User.findAll();
      // const response=await User.findOne();
      
             await t.commit()
      logger.debug("user update successfully");
      return this.responseHelper.onSuccess(
        res,
        "user fetched---- successfully",
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
    //  } finally {
    //   if (t && !t.finished) {
    //     await t.rollback();
    //    }
    //  }
  }
}
}
