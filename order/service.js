import { logger } from "../config/logger";
import { get, isEmpty } from "lodash";
import { ResponseHelper, CryptoHelper, EmailHelper, SMSHelper } from "../utils";
import {
  EmailTemplate,
  User,
  Product,
  Order,
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

export class OrderService {
  constructor() {
    this.responseHelper = new ResponseHelper();
    this.cryptoHelper = new CryptoHelper();
    this.emailHelper = new EmailHelper();
    this.smsHelper = new SMSHelper();
  }

  async addOrder(req, res) {
    const t = await sequelize.transaction();
    try {
      console.log("req.body------->", req.body);

      const response = await Order.create(
        {
          pId: req?.body?.pId,
          id: req?.body?.id,
          description: req?.body?.description,
          createdBy:req?.body?.createdBy,
        },
        { transaction: t, logging: true }
      );
      await t.commit();
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
        return this.responseHelper.notAuthorized(res, new Error("No addedd"));
      }
    } finally {
      if (t && !t.finished) {
        await t.rollback();
      }
    }
  }

  async updateOrder(req, res) {
    const t = await sequelize.transaction();
    try {
      console.log("req.body------xxx->", req.body);
      const response = await Order.update(
        { pId: req?.body?.pId, description: req?.body?.description }, // Update the contact_no value
        {
          where: { oId: req?.body?.oId }, // Specify the condition for the update
          transaction: t,
          logging: true,
        }
      );
      await t.commit();
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
        return this.responseHelper.notAuthorized(res, new Error("No addedd"));
      }
    } finally {
      if (t && !t.finished) {
        await t.rollback();
      }
    }
  }

  async getOrder(req, res) {
    const t = await sequelize.transaction();
    try {
      console.log("req.body------xxx->", req.body);
      const response = await Order.findAll({
        attributes:[
          'oId',
          'description'
      ],
        include: [
          {
            attributes:[
              'pId',
              'productName',
              'productDesc',
              'productPrice',
          ],
            model: Product,
            as: "productDetails",
          },
          {
            attributes:[
              'id',
              'contactNo',
              'name',
              
          ],
            model: User,
            as: "userDetails",
          },
        ]
      });

      await t.commit();
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
        return this.responseHelper.notAuthorized(res, new Error("No addedd"));
      }
      //  } finally {
      //   if (t && !t.finished) {
      //     await t.rollback();
      //    }
      //  }
    }
  }
}
